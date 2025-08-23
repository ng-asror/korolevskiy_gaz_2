import { IBasket } from '../interfaces';
import { Basket } from '../services';

export function calcCont(res: IBasket, basketService: Basket): void {
  const currentBasket = basketService.localBasket.getValue();
  const accessoriesCount = res.data.accessories.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const azotCount = res.data.azots.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  basketService.localBasket.next({
    ...currentBasket,
    accessories: res.data.accessories,
    azots: res.data.azots,
    total_count: accessoriesCount + azotCount,
    total_price: res.data.total_price,
  });
}
